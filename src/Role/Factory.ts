import {Settings} from "../Settings";
import {Util_Logger} from "../Util/Logger";
import {Role_Harvester} from "./Harvester";
import {Role_Builder} from "./Builder";
import {Role_Wallie} from "./Wallie";
import {Role_Upgrader} from "./Upgrader";
import {Role_Transporter} from "./Transporter";
import {Role_SpawnSupplier} from "./SpawnSupplier";
import {Role_Defender} from "./Defender";
import {Role_Scout} from "./Scout";
import {Role_Claimer} from "./Claimer";

export class Role_Factory {

    public static minimumCreepCount(role: string) {
        switch (role) {
            case Settings.ROLE_HARVESTER:
                return Settings.NUMBER_OF_HARVESTER;

            case Settings.ROLE_BUILDER:
                return Settings.NUMBER_OF_BUILDER;

            case Settings.ROLE_UPGRADER:
                return Settings.NUMBER_OF_UPGRADER;

            case Settings.ROLE_TRANSPORTER:
                return Settings.NUMBER_OF_TRANSPORTER;

            case Settings.ROLE_SPAWN_SUPPLIER:
                return Settings.NUMBER_OF_SPAWN_SUPPLIER;

            case Settings.ROLE_WALLIE:
                return Settings.NUMBER_OF_WALLIE;

            case Settings.ROLE_DEFENDER:
                return Settings.NUMBER_OF_DEFENDER;

            case Settings.ROLE_SCOUT:
                return Settings.NUMBER_OF_SCOUT;

            case Settings.ROLE_CLAIMER:
                return Settings.NUMBER_OF_CLAIMER;

            default:
                Util_Logger.error("Cannot find minimum creep count for illegal name '" + role + "'");
                throw new Error();
        }
    }

    public static isRoomIndependant(role: string) {
        switch (role) {
            case Settings.ROLE_SCOUT:
            case Settings.ROLE_CLAIMER:
            case Settings.ROLE_TRANSPORTER:
                return true;

            default:
                return false;
        }
    }

    public static roles(): string[] {
        return [
            Settings.ROLE_CLAIMER,
            Settings.ROLE_SCOUT,
            Settings.ROLE_DEFENDER,
            Settings.ROLE_WALLIE,
            Settings.ROLE_BUILDER,
            Settings.ROLE_UPGRADER,
            Settings.ROLE_TRANSPORTER,
            Settings.ROLE_SPAWN_SUPPLIER,
            Settings.ROLE_HARVESTER,
        ];
    }

    public static bodyParts(role: string, spawn: StructureSpawn) {
        let energyCapacityAvailable = spawn.room.energyCapacityAvailable;
        let energyAvailable = spawn.room.energyAvailable;

        switch (role) {
            case Settings.ROLE_HARVESTER:
                let energy = spawn.room.creepsOfRole(Settings.ROLE_HARVESTER).length > 0 ? energyCapacityAvailable : energyAvailable;

                return Role_Harvester.bodyParts(energy);

            case Settings.ROLE_BUILDER:
                return Role_Builder.bodyParts(energyCapacityAvailable);

            case Settings.ROLE_WALLIE:
                return Role_Wallie.bodyParts(energyCapacityAvailable);

            case Settings.ROLE_UPGRADER:
                return Role_Upgrader.bodyParts(energyCapacityAvailable);

            case Settings.ROLE_TRANSPORTER:
                return Role_Transporter.bodyParts(energyCapacityAvailable);

            case Settings.ROLE_SPAWN_SUPPLIER:
                return Role_SpawnSupplier.bodyParts(energyCapacityAvailable);

            case Settings.ROLE_DEFENDER:
                return Role_Defender.bodyParts(energyCapacityAvailable);

            case Settings.ROLE_SCOUT:
                return Role_Scout.bodyParts(energyCapacityAvailable);

            case Settings.ROLE_CLAIMER:
                return Role_Claimer.bodyParts(energyCapacityAvailable);

            default:
                Util_Logger.error("Cannot detect body parts. Illegal name '" + role + "'");
                throw new Error();
        }
    }
}