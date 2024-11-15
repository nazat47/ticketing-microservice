import {
  ExpirationCompleteEvent,
  Publisher,
  Subjects,
} from "@naztickets/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
