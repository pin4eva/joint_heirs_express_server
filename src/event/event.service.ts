/* eslint-disable no-useless-catch */

import { CreateEventInput, UpdateEventInput } from "./event.dto";
import { Event } from "./event.model";

export class EventService {
  find() {
    throw new Error("Method not implemented.");
  }
  async getEvents() {
    try {
      return await Event.find();
    } catch (error) {
      throw error;
    }
  }
  public async createEvent(input: CreateEventInput) {
    try {
      const event = new Event(input);
      await event.save();
      return event;
    } catch (error) {
      throw new Error(String(error));
    }
  }
  public async updateEvent(input: UpdateEventInput) {
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
  public async deleteAllEvent(id: string) {
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

  public async findEventById(id: string) {
    try {
      const event = await Event.findById(id);
      if (!event) throw new Error("Event not found");
      return event;
    } catch (error) {
      throw new Error(String(error));
    }
  }
}
