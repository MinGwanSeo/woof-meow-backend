import { Controller } from "@nestjs/common";
import typia, { TypeGuardError } from "typia";

import {
    TypedBody,
    TypedParam,
    TypedRoute
} from "@nestia/core";

@Controller('exception')
export class ExceptionController {
    @TypedRoute.Post(':id/typed')
    public async typed() {
        return 'typed';
    }
}