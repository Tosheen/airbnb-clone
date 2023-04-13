import { v4 as uuidv4 } from "uuid";

export function getUniqueClientId() {
  if (typeof window === "undefined") {
    return null;
  }

  let clientId = localStorage.getItem("cs-client-id");

  if (clientId == null) {
    clientId = uuidv4();
    localStorage.setItem("cs-client-id", clientId);
  }

  return clientId;
}
