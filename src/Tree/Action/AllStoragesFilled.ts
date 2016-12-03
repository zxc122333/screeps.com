import {Tree_Core_Action} from "../Core/Action";
import {Settings} from "../../Settings";

export class Tree_Action_AllStoragesFilled extends Tree_Core_Action {

    private room: Room;

    public constructor(room: Room) {
        super();
        this.room = room;
    }

    public tick(): number {
        if (this.room.findFilledStorages().length === 0) {
            return Settings.TREE_SUCCESS;
        }

        return Settings.TREE_FAILURE;
    }
}
