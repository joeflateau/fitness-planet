import { MomentInput, Moment } from "moment";

class FitnessPlanet {
  signin(username: string, password: string): this;
  getCheckins(lowDate: MomentInput, highDate: MomentInput): Promise<Moment[]>;
}

export = FitnessPlanet;
