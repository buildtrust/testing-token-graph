import { BigInt } from "@graphprotocol/graph-ts"
import {
  TestingToken,
  Approved,
  Commit,
  Rejected
} from "../generated/TestingToken/TestingToken"
import { Proposal } from "../generated/schema"

export function handleApproved(event: Approved): void {
  let id = event.params.commit.toHex()
  let proposal = Proposal.load(id)
  if (proposal != null) {
    proposal.status = 1;
    proposal.timeAdmin = event.block.timestamp;
    proposal.save();
  }
}

export function handleCommit(event: Commit): void {
  let proposal = new Proposal(event.params.commit.toHex())
  proposal.placeBlockNumber = event.params.placeBlockNumber.toString();
  proposal.status = event.params.status;
  proposal.proposer = event.params.proposer;
  proposal.timeCommitted = event.block.timestamp;
  proposal.save();
}

export function handleRejected(event: Rejected): void {
  let id = event.params.commit.toHex()
  let proposal = Proposal.load(id)
  if (proposal != null) {
    proposal.status = 2;
    proposal.timeAdmin = event.block.timestamp;
    proposal.save();
  }
}
