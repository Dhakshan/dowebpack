import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { CommonService } from './common.service';

describe('Common Service', () => {
  beforeEachProviders(() => [CommonService]);

  it('should ...',
      inject([CommonService], (service: CommonService) => {
    expect(service).toBeTruthy();
  }));
});
