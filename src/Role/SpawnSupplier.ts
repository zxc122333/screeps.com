import {Role_Role} from "./Role";
import {Tree_Tree} from "../Tree/Tree_Tree";
import {Tree_Composite_Priority} from "../Tree/Composite/Priority";
import {Check_AllSpawnsFilled} from "../Check/AllSpawnsFilled";
import {Tree_Decorator_Inverter} from "../Tree/Decorator/Inverter";
import {Action_Transfer} from "../Action/Transfer";
import {Action_MoveTo} from "../Action/MoveTo";
import {Tree_Composite_Sequence} from "../Tree/Composite/Sequence";
import {Action_Withdraw} from "../Action/Withdraw";
import {Action_PickUp} from "../Action/PickUp";
import {Check_DroppedEnergyAvailable} from "../Check/DroppedEnergyAvailable";
import {Action_UpgradeController} from "../Action/UpgradeController";
import {Check_CreepIsAtCarryAmount} from "../Check/CreepIsAtCarryAmount";

/**
 * supplys spawn points and extensions with energy
 */
export class Role_SpawnSupplier extends Role_Role {

    public static role(): string {
        return "SpawnSupplier";
    }

    public constructor(creep: Creep) {
        let room = creep.room;

        let tree = new Tree_Tree(
            creep,
            new Tree_Composite_Priority([
                new Tree_Composite_Sequence([
                    new Tree_Decorator_Inverter(
                        new Check_CreepIsAtCarryAmount(creep, 0),
                    ),
                    new Tree_Decorator_Inverter(
                        new Check_AllSpawnsFilled(room),
                    ),
                    new Tree_Composite_Priority([
                        new Action_Transfer(creep, RESOURCE_ENERGY, room.findNearestSpawnInNeedOfEnergy(creep)),
                        new Action_MoveTo(creep, room.findNearestSpawnInNeedOfEnergy(creep)),
                    ]),
                ]),
                new Tree_Composite_Sequence([
                    new Tree_Decorator_Inverter(
                        new Check_CreepIsAtCarryAmount(creep, 0),
                    ),
                    new Tree_Composite_Priority([
                        new Action_UpgradeController(creep),
                        new Action_MoveTo(creep, room.controller),
                    ]),
                ]),
                new Tree_Composite_Sequence([
                    new Check_DroppedEnergyAvailable(creep),
                    new Tree_Composite_Priority([
                        new Action_PickUp(creep, room.findNearestDroppedEnergy(creep)[0]),
                        new Action_MoveTo(creep, room.findNearestDroppedEnergy(creep)[0]),
                    ]),
                ]),
                new Tree_Composite_Priority([
                    new Action_Withdraw(creep, room.findNearestFilledStorage(creep)[0], RESOURCE_ENERGY),
                    new Action_MoveTo(creep, room.findNearestFilledStorage(creep)[0]),
                ]),
            ]),
        );

        super(creep, tree);
    }
}
