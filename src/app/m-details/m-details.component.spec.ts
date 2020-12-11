import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MDetailsComponent} from './m-details.component';

describe('MDetailsComponent', () => {
    let component: MDetailsComponent;
    let fixture: ComponentFixture<MDetailsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MDetailsComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
