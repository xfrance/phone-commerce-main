import { LightningElement } from 'lwc';

import {Tree} from "c/dataStructures";

export default class ProductSearch extends LightningElement {

    hasRendered = false;
    renderedCallback() {
        if (this.hasRendered) return;

        this.hasRendered = true;

        this.template.querySelector('c-products-tree-grid').expandAll();

    }

    handleSearch(event) {
        this.template.querySelector('c-products-tree-grid').filter(event.target.value);
    }
}
