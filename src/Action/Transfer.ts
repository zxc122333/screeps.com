import {Tree_Core_Action} from "../Tree/Core/Action";
import {Settings} from "../Settings";

export class Action_Transfer extends Tree_Core_Action {

    private creep: Creep;

    private resource: string;

    private target: Creep|Spawn|Structure;

    public constructor(creep: Creep, resource: string, target: Creep|Spawn|Structure) {
        super();
        this.creep = creep;
        this.resource = resource;
        this.target = target;
    }

    public tick(): number {
        if (this.creep.transfer(this.target, this.resource) === OK) {
            return Settings.TREE_SUCCESS;
        }

        return Settings.TREE_FAILURE;
    }
}