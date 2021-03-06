import {Action_AssignNearestSpawnInNeedOfEnergyAsTarget} from "../Action/AssignNearestSpawnInNeedOfEnergyAsTarget";
import {Action_TransferToTarget} from "../Action/TransferToTarget";
import {Action_MoveToTarget} from "../Action/MoveToTarget";
import {Tree_Composite_Priority} from "../Tree/Composite/Priority";
import {Tree_Composite_Sequence} from "../Tree/Composite/Sequence";
import {Action_AssignNearestTowerInNeedOfEnergyAsTarget} from "../Action/AssignNearestTowerInNeedOfEnergyAsTarget";
import {Action_AssignControllerAsTarget} from "../Action/AssignControllerAsTarget";
import {Action_UpgradeController} from "../Action/UpgradeController";
import {Check_DroppedEnergyAvailable} from "../Check/DroppedEnergyAvailable";
import {Action_AssignNearestDroppedEnergyAsTarget} from "../Action/AssignNearestDroppedEnergyAsTarget";
import {Action_PickUpTarget} from "../Action/PickUpTarget";
import {Action_AssignNearestFilledStorageAsTarget} from "../Action/AssignNearestFilledStorageAsTarget";
import {Action_WithdrawFromTarget} from "../Action/WithdrawFromTarget";
import {Tree_Tree} from "../Tree/Tree";
import {Check_IsInTargetRoom} from "../Check/IsInTargetRoom";
import {Action_MoveToTargetRoom} from "../Action/MoveToTargetRoom";
import {Check_ASpawnsIsInNeedOfEnergy} from "../Check/ASpawnsIsInNeedOfEnergy";
import {Check_CreepCarriesSomething} from "../Check/CreepCarriesSomething";
import {Check_FilledStorageAvailable} from "../Check/FilledStorageAvailable";

export = new Tree_Tree(
    "SpawnSupplier",
    new Tree_Composite_Sequence([
        new Tree_Composite_Priority([
            new Check_IsInTargetRoom(),
            new Action_MoveToTargetRoom(),
        ]),
        new Tree_Composite_Priority([
            new Tree_Composite_Sequence([
                new Check_CreepCarriesSomething(),
                new Action_AssignNearestTowerInNeedOfEnergyAsTarget(),
                new Tree_Composite_Priority([
                    new Action_TransferToTarget(RESOURCE_ENERGY),
                    new Action_MoveToTarget(),
                ]),
            ]),
            new Tree_Composite_Sequence([
                new Check_CreepCarriesSomething(),
                new Check_ASpawnsIsInNeedOfEnergy(),
                new Action_AssignNearestSpawnInNeedOfEnergyAsTarget(),
                new Tree_Composite_Priority([
                    new Action_TransferToTarget(RESOURCE_ENERGY),
                    new Action_MoveToTarget(),
                ]),
            ]),
            new Tree_Composite_Sequence([
                new Check_CreepCarriesSomething(),
                new Action_AssignControllerAsTarget(),
                new Tree_Composite_Priority([
                    new Action_UpgradeController(),
                    new Action_MoveToTarget(),
                ]),
            ]),
            new Tree_Composite_Sequence([
                new Check_DroppedEnergyAvailable(),
                new Action_AssignNearestDroppedEnergyAsTarget(),
                new Tree_Composite_Priority([
                    new Action_PickUpTarget(),
                    new Action_MoveToTarget(),
                ]),
            ]),
            new Tree_Composite_Sequence([
                new Check_FilledStorageAvailable(),
                new Action_AssignNearestFilledStorageAsTarget(),
                new Tree_Composite_Priority([
                    new Action_WithdrawFromTarget(RESOURCE_ENERGY),
                    new Action_MoveToTarget(),
                ]),
            ]),
        ]),
    ]),
);
