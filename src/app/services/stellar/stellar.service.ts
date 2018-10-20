import { Injectable } from '@angular/core';
import * as StellarSdk from 'stellar-sdk/dist/stellar-sdk.min.js';

// declare const StellarSdk: any;

@Injectable({
  providedIn: 'root'
})
export class StellarService {

    private server: any;

    constructor() {
        // this.server = new StellarSdk.Server('https://horizon.stellar.org');
        // StellarSdk.Network.usePublicNetwork();
        this.server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
        StellarSdk.Network.useTestNetwork();
    }

    validateSecretKey(secretKey: string) {
      const pubKey = this.getPublicKey(secretKey);
      return (secretKey !== null &&
              secretKey !== undefined &&
              secretKey !== '' && 
              typeof pubKey === 'string' &&
              pubKey !== null &&
              pubKey !== undefined &&
              pubKey !== '');
    }
    
    getPublicKey(secretKey: string) {
      return StellarSdk.Keypair.fromSecret(secretKey).publicKey();
    }

    cacheKeys(secretKey: string) {
      if (this.validateSecretKey(secretKey)) {
        localStorage.setItem('secretKey', secretKey);
        localStorage.setItem('publicKey', this.getPublicKey(secretKey));
      }
      else throw Error('invalid secret key')
    }

    loadBalances(publicKey: string) {
      return this.server.loadAccount(publicKey)
        .catch(StellarSdk.NotFoundError, function (error) {
            throw new Error(error);
        })
        .then(account => account)
        .map((r: any) => <Array<AssetBalance>> r.balances)
    }

    sendPayment (receiver: string, amount: string | number, memo: string) {
      const secretKey = sessionStorage.getItem('seed_key');
      const pubKey = sessionStorage.getItem('public_key');
      if (!secretKey) { return; }
      const sourceKeys = StellarSdk.Keypair.fromSecret(secretKey);
      return this.server.loadAccount(pubKey)
          .then(function(sourceAccount) {
              const transaction = new StellarSdk.TransactionBuilder(sourceAccount)
                  .addOperation(StellarSdk.Operation.payment({
                      destination: receiver,
                      asset: StellarSdk.Asset.native(), 
                      memo: memo || "Rent Payment",
                      amount: amount
                  }))
              .build();
              transaction.sign(sourceKeys); 
              return this.server.submitTransaction(transaction);
          })
          .catch(function(error) {
              console.log(error);
              throw error;
          })
          .then(result => result)
          .catch(function(error) {
              console.log(error);
              throw error;
          });
  }

}

declare interface AssetBalance {
    balance: string;
    asset_type: string;
}