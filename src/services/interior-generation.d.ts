import { Api } from "grammy";
type InteriorGenerationSuccess = {
    readonly ok: true;
    readonly uploadedImageUrl: string;
    readonly message: string;
};
type InteriorGenerationFailure = {
    readonly ok: false;
    readonly message: string;
};
export type InteriorGenerationResult = InteriorGenerationSuccess | InteriorGenerationFailure;
export declare function processInteriorGeneration(api: Api, fileId: string): Promise<InteriorGenerationResult>;
export {};
//# sourceMappingURL=interior-generation.d.ts.map