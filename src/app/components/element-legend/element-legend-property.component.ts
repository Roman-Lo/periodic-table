import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-element-legend-property',
    template: `
        <span class="element-legend-property">
            <span class="legend-indicator" ngClass="{{ indicatorClass }}">
                <i></i>
            </span>
            {{ name }}
        </span>
    `,
    styleUrls: ['./element-legend-property.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ElementLegendPropertyComponent implements OnInit {

    @Input() name: string;

    @Input() arrowDirection: 'top' | 'bottom' | 'left' | 'right';


    constructor() { }

    ngOnInit() {
        if (this.arrowDirection == null) {
            this.arrowDirection = 'right';
        }
    }

    get indicatorClass(): string {
        return `arrow-${this.arrowDirection}`;
    }

}
