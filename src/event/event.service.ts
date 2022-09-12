/* eslint-disable no-useless-catch */

import { CreateEventInput, UpdateEventInput } from "./event.dto";
import { Event } from "./event.model";

export class EventService {
  // get all events
  async getEvents() {
    try {
      return await Event.find();
    } catch (error) {
      throw error;
    }
  }

  // create events
  public async createEvent(input: CreateEventInput) {
    const { endDate, isSingleDate } = input;
    try {
      const event = new Event(input);
      if (!isSingleDate && !endDate) {
        throw new Error("Please include an end date");
      }
      await event.save();
      return event;
    } catch (error) {
      throw error;
    }
  }

  // update events
  public async updateEvent(input: UpdateEventInput) {
    try {
      const event = await this.findEventById(input.id);
      Object.assign(event, input);
      await event.save();
      return event;
    } catch (error) {
      throw error;
    }
  }

  // delete events
  public async deleteEvent(id: string) {
    try {
      const event = await this.findEventById(id);
      await event.remove();

      return event;
    } catch (error) {
      throw new Error(String(error));
    }
  }

  // delete all events
  public async deleteAllEvent() {
    try {
      const events = await Event.find();

      for (const event of events) {
        await event.remove();
      }

      return events;
    } catch (error) {
      throw error;
    }
  }

  // get events by id
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
