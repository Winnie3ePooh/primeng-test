import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowsContentComponent } from './flows-content.component';

describe('FlowsContentComponent', () => {
  let component: FlowsContentComponent;
  let fixture: ComponentFixture<FlowsContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowsContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
