import JSZip from "jszip";

export async function processArchive(file: File) {
  const zip = await JSZip.loadAsync(file);

  const data: Record<string, any> = {};

  async function read(path: string) {
    try {
      const file = zip.file(path);
      if (!file) return null;
      return JSON.parse(await file.async("string"));
    } catch {
      return null;
    }
  }

  data.followers = await read("connections/followers.json");
  data.following = await read("connections/following.json");
  data.blocked = await read("connections/blocklist.json");
  data.muted = await read("connections/muted_accounts.json");
  data.likes = await read("likes.json");
  data.comments = await read("comments.json");
  data.stories = await read("stories/seen.json");

  return data;
}
