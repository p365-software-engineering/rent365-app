import { TestBed } from '@angular/core/testing';

import { {{pascalCase name}} } from "./{{dashCase name}}.service";

describe('{{pascalCase name}}', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: {{pascalCase name}} = TestBed.get({{pascalCase name}});
    expect(service).toBeTruthy();
  });
});
