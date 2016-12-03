import {Tree_Core_Action} from "../Core/Action";
import {Tree_Tree} from "../Tree_Tree";

export class Tree_Action_RoomHasStructure extends Tree_Core_Action {

    private room: Room;

    private structure: string;

    public constructor(room: Room, structure: string) {
        super();
        this.room = room;
        this.structure = structure;
    }

    public tick(): number {
        let structures = this.room.find(FIND_STRUCTURES, {
            filter: (structure: Structure) => structure.structureType === this.structure,
        }).length;

        if (structures > 0) {
            return Tree_Tree.SUCCESS;
        }

        return Tree_Tree.FAILURE;
    }
}
