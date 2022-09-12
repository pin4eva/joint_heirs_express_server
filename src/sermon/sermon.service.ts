import { CreateSermonInput, UpdateSermonInput } from "./sermon.dto";
import { Sermon } from "./sermon.model";

export class SermonService {
  //create sermon
  public async createSermon(input: CreateSermonInput) {
    try {
      const isSermon = await Sermon.findOne({
        videoLink: input.videoLink,
        audioLink: input.audioLink,
        text: input.text,
      });
      if (isSermon) throw new Error("Sermon already exist");
      const sermon = new Sermon(input);
      await sermon.save();
      return sermon;
    } catch (error) {
      throw new Error(String(error));
    }
  }

  async getSermons() {
    try {
      const sermons = await Sermon.find();
      return sermons;
    } catch (error) {
      throw new Error(String(error));
    }
  }

  public async updateSermon(input: UpdateSermonInput) {
    try {
      const sermon = await Sermon.findById(input.id);
      if (!sermon) throw new Error("Sermon id not valid");
      Object.assign(sermon, input);
      await sermon.save();
      return sermon;
    } catch (error) {
      throw new Error(String(error));
    }
  }

  public async getSermonById(id: string) {
    try {
      const sermon = await Sermon.findById(id);
      if (!sermon) throw new Error("Sermon not found");
      return sermon;
    } catch (error) {
      throw new Error(String(error));
    }
  }

  public async deleteSermon(id: string) {
    try {
      const sermon = await Sermon.findById(id);
      if (!sermon) throw new Error("INvalid sermon id");
      await sermon.remove();
      return sermon;
    } catch (error) {
      throw new Error(String(error));
    }
  }
}
