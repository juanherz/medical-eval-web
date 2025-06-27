import { Amplify } from "aws-amplify";
import awsExports from "@/aws-exports";

let done = false;
export function initAmplify() {
  if (!done) {
    Amplify.configure(awsExports);   // sólo Auth
    done = true;
  }
}
