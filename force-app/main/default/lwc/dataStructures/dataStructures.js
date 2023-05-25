const ROOT = "root";

export class Tree {

    root;

    constructor(data, childrenField) {
        this.root = new Node(ROOT);
        this.root.addRawChildren(data, childrenField);
    }

    /**
     * Navigates the Tree top to bottom.
     * @param config Configuration object for Tree navigation.
     * @returns {*}
     */
    forEachBreadthFirst(config) {
        return this.forEachBreadthFirstInternal(this.root.children, config);
    }

    forEachBreadthFirstInternal(nodes, config) {
        if (nodes.length === 0) return;

        if (!config) {
            config = new TreeNavigationConfig();
        }

        let earlyExit = false;
        let nextLevel = [];
        let results = [];

        for (let i = 0; i < nodes.length; i++) {
            let node = nodes[i];
            nextLevel.push(node.children);
            let result = config.evaluateNodeValue(node.value);

            results.push(result);

            if (config.earlyExitCondition(result) === true) {
                earlyExit = true;
                break;
            }
        }

        if (!earlyExit) {
            results.concat(this.forEachBreadthFirstInternal(nextLevel, config));
        }

        return config.collector(results);
    }

    forEachDepthFirst(config) {
        return this.forEachDepthFirstInternal(this.root.children, config);
    }

    forEachDepthFirstInternal(nodes, config) {
        if (nodes.length === 0) return;

        if (!config) {
            config = new TreeNavigationConfig();
        }

        let results = [];

        for (let i = 0; i < nodes.length; i++) {
            let node = nodes[i];
            // Visit the current node
            let result = config.evaluateNodeValue(node.value);

            results.push(result);

            if (config.earlyExitCondition(result) === true) {
                break;
            }

            // Recursively traverse the current node's subtree from the left
            results.concat(this.forEachDepthFirstInternal(node.children, config));
        }

        return config.collector(results);
    }
}

export class Node {

    value;
    children = [];

    constructor(value) {
        this.value = value;
    }

    addRawChildren(data, childrenField) {
        for (let i = 0; i < data.length; i++) {
            let value = data[i];
            let node = new Node(value);
            if (value[childrenField] !== undefined) {
                node.addRawChildren(value[childrenField], childrenField);
            }
            this.children.push(node);
        }
    }
}

/**
 * Configuration object for Tree navigation.
 */
export class TreeNavigationConfig {
    evaluateNodeValue = node => node.value;
    earlyExitCondition = lastResult => false;
    collector = results => results;

    // Builder methods
    /**
     * Sets the function that will be executed for each Node value.
     * @param evaluateNodeValue Each Node value is passed to this function for execution.
     * @returns {TreeNavigationConfig}
     */
    withEvaluateNodeValue(evaluateNodeValue) {
        this.evaluateNodeValue = evaluateNodeValue;
        return this;
    }

    /**
     * Sets the function that will exclude a result from the final result list.
     * @param excludeResultCondition The result of each evaluateNodeValue execution is passed to this function, if it
     * returns true the result is not to be included in the final result.
     * @returns {TreeNavigationConfig}
     */
    withExcludeResultCondition(excludeResultCondition) {
        this.excludeResultCondition = excludeResultCondition;
        return this;
    }

    /**
     * Sets the function that will exclude a Node children from being evaluated.
     * @param excludeChildrenCondition The result of each evaluateNodeValue execution is passed to this function, if it
     * returns true the children of the node are not evaluated.
     * @returns {TreeNavigationConfig}
     */
    withExcludeChildrenCondition(excludeChildrenCondition) {
        this.excludeChildrenCondition = excludeChildrenCondition;
        return this;
    }

    /**
     * Sets the function that will interrupt the Tree navigation.
     * @param earlyExitCondition The result of each evaluateNodeValue execution is passed to this function, if it
     * returns true the Tree navigation is interrupted.
     * @returns {TreeNavigationConfig}
     */
    withEarlyExitCondition(earlyExitCondition) {
        this.earlyExitCondition = earlyExitCondition;
        return this;
    }

    /**
     * Sets the function that will transform the result of each evaluateNodeValue execution.
     * @param collector The results from each evaluateNodeValue are passed to this function that can transform the result.
     * @returns {TreeNavigationConfig}
     */
    withCollector(collector) {
        this.collector = collector;
        return this;
    }
}
