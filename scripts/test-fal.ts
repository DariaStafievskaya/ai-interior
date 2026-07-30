import { fal } from "@fal-ai/client";
import { config } from "../src/config";

async function main() {
  fal.config({
    credentials: config.falKey,
  });

  console.log("✅ Fal SDK успешно настроен.");
  console.log("Ключ загружен.");
}

main().catch((error) => {
  console.error(error);
});