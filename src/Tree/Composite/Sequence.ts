import {Tree_Core_Composite} from "../Core/Composite";
import {Tree_Core_Tick} from "../Core/Tick";
import {TREE_SUCCESS} from "../../Constants";

export class Tree_Composite_Sequence extends Tree_Core_Composite {

    public tick(tick: Tree_Core_Tick) {
        for (const child of this.children) {
            const status = child.execute(tick);

            if (status !== TREE_SUCCESS) {
                return status;
            }
        }

        return TREE_SUCCESS;
    }

    public getDescription(tick: Tree_Core_Tick): string {
        return "I try to do all of the following things.";
    }
}
