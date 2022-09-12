/* eslint-disable no-useless-catch */

import { EventInput } from "./event.dto";
import { Event } from "./event.model";

export class EventService {
  async getEvents() {
    try {
      const users = await Event.find();
      return users;
    } catch (error) {
      throw error;
    }
  }

  public async updateEvent(input: EventInput) {
    try {
      const event = await this.findEventById(input.id);
      Object.assign(event, input);
      await event.save();
      return event;
    } catch (error) {
      throw new Error(String(error));
    }
  }

  public async deleteEvent(id: string) {
    try {
      const event = await this.findEventById(id);
      await event.remove();

      return event;
    } catch (error) {
      throw new Error(String(error));
    }
  }

  public async getEventById(id: string) {
    return await this.findEventById(id);
  }

  private async findEventById(id: string) {
    try {
      const event = await Event.findById(id);
      if (!event) throw new Error("Event not found");
      return event;
    } catch (error) {
      throw new Error(String(error));
    }
  }
}
