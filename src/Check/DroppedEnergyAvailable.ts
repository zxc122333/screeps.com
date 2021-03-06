import {Tree_Core_Action} from "../Tree/Core/Action";
import {Tree_Core_Tick} from "../Tree/Core/Tick";
import {TREE_FAILURE, TREE_SUCCESS} from "../Constants";

export class Check_DroppedEnergyAvailable extends Tree_Core_Action {

    private readonly range: number;

    public constructor(range?: number) {
        super();
        this.range = range;
    }

    public tick(tick: Tree_Core_Tick): number {
        const creep = tick.target as Creep;

        if (creep.room.amountOfDroppedEnergy() === 0) {
            return TREE_FAILURE;
        }

        if (!this.range) {
            return TREE_SUCCESS;
        }

        const resource = creep.room.findDroppedResources().is(RESOURCE_ENERGY).closestByPath(creep.pos);
        if (!resource) {
            return TREE_FAILURE;
        }

        if (creep.pos.inRangeTo(resource.pos, this.range)) {
            return TREE_SUCCESS;
        }

        return TREE_FAILURE;
    }

    public getDescription(tick: Tree_Core_Tick): string {
        return "There is dropped energy available.";
    }
}
