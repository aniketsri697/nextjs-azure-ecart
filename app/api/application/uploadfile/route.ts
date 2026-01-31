import { BlobServiceClient, generateBlobSASQueryParameters, BlobSASPermissions, StorageSharedKeyCredential } from "@azure/storage-blob";
import { NextResponse } from "next/server";

const accountName = process.env.AZURE_STORAGE_ACCOUNT!;
const accountKey = process.env.AZURE_STORAGE_KEY!;
const containerName = process.env.containerName!;

export async function POST() {
  const blobName = `${crypto.randomUUID()}.jpg`;

  const sharedKeyCredential = new StorageSharedKeyCredential(
    accountName,
    accountKey
  );

  const sasToken = generateBlobSASQueryParameters(
    {
      containerName,
      blobName,
      permissions: BlobSASPermissions.parse("w"), // write only
      expiresOn: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
    },
    sharedKeyCredential
  ).toString();

  const uploadUrl = `https://${accountName}.blob.core.windows.net/${containerName}/${blobName}?${sasToken}`;
  const publicUrl = `https://${accountName}.blob.core.windows.net/${containerName}/${blobName}`;

  return NextResponse.json({ uploadUrl, publicUrl });
}
