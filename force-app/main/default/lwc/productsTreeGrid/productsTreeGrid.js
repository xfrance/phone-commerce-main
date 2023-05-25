import { LightningElement, api, track } from 'lwc';
import {Tree, TreeNavigationConfig} from "c/dataStructures";

import {
    EXAMPLES_COLUMNS_DEFINITION_BASIC,
    EXAMPLES_DATA_BASIC,
} from './sourceData';

export default class ProductsTreeGrid extends LightningElement {

    // definition of columns for the tree grid
    @track gridColumns = EXAMPLES_COLUMNS_DEFINITION_BASIC;

    // data provided to the tree grid
    @track gridData = EXAMPLES_DATA_BASIC;

    _searchTerm;

    get searchTerm() {
        return this._searchTerm;
    }

    set searchTerm(value) {
        this._searchTerm = value;
        this.doFilter();
    }

    @api
    expandAll() {
        this.template.querySelector('lightning-tree-grid').expandAll();
    }

    @api
    filter(searchTerm) {
        this.searchTerm = searchTerm;
    }

    doFilter() {
        if (this.searchTerm === undefined || this.searchTerm === null || this.searchTerm.trim() === '') {
            this.gridData = EXAMPLES_DATA_BASIC;
            return;
        }

        this.gridData = [];

        let tree = new Tree(EXAMPLES_DATA_BASIC, '_children');

        tree.forEachDepthFirst(
            new TreeNavigationConfig()
                .withEvaluateNodeValue(product => {
                    if (product.productName.toLowerCase().startsWith(this.searchTerm.toLowerCase())) {
                        this.gridData.push(product);
                        return true;
                    }
                    return false;
                })
                .withExcludeChildrenCondition(result => result === true)
        );
    }

    highlightSearchTerm() {
        let tree = new Tree(this.gridData, '_children');
    }
}
