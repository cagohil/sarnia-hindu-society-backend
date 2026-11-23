import { Member, MEMBER_FIELDS } from "../models/member.model.js";
import { notFound } from "../utils/httpError.js";
import { pick } from "../utils/pick.js";

export const listMembers = async (req, res) => {
  res.json(await Member.find());
};

export const createMember = async (req, res) => {
  res.send(await Member.create(pick(req.body, MEMBER_FIELDS)));
};

export const updateMember = async (req, res) => {
  const members = await Member.findByIdAndUpdate(
    req.params.id,
    { $set: pick(req.body, MEMBER_FIELDS) },
    { returnDocument: "after" }
  );
  if (!members) throw notFound();
  res.json({ members });
};

export const deleteMember = async (req, res) => {
  const members = await Member.findByIdAndDelete(req.params.id);
  if (!members) throw notFound();
  res.json({ Success: "member has been deleted", members });
};
