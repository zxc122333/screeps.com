import {Tree_Core_Action} from "../Tree/Core/Action";
import {Settings} from "../Settings";
import {Tree_Core_Tick} from "../Tree/Core/Tick";

export class Action_AttackTarget extends Tree_Core_Action {

    public tick(tick: Tree_Core_Tick): number {
        let creep = tick.target as Creep;
        let target = tick.blackboard.get("target", tick.tree.id) as Creep|Structure;

        if (creep.attack(target) !== OK) {
            return Settings.TREE_FAILURE;
        }

        if (target.hits === 0) {
            return Settings.TREE_SUCCESS;
        }

        return Settings.TREE_RUNNING;
    }
}