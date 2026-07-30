import type { GenerationContext } from "../user-session";

export function createInteriorPrompt(context: GenerationContext): string {
  return [
    `Redesign this ${context.roomType} interior in ${context.style} style with a ${context.budget} budget level.`,
    `Create design variant number ${context.generationNumber} for this same project.`,
    "Preserve the original room exactly.",
    "Do not change: room dimensions, walls, ceiling height, windows, doors, architectural elements, camera position, camera angle, perspective.",
    "Do not enlarge or shrink the room.",
    "Do not redesign another room.",
    "Keep the furniture layout unless replacing furniture is necessary for the requested style.",
    "Only redesign: furniture, colors, finishes, textiles, lighting, decor.",
    "The result must look like the same room after renovation.",
    "Photorealistic.",
    "No text.",
    "No watermark.",
  ].join(" ");
}
