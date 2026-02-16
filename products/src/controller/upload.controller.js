const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { fromInstanceMetadata } = require("@aws-sdk/credential-providers");

const REGION = "ap-south-2";
const BUCKET = "ecommerce-uploads-army-2026";

const s3 = new S3Client({
  region: REGION,
  credentials: fromInstanceMetadata(), // 👈 force EC2 IAM role
});

module.exports = async (req, res) => {
  try {
    const { filename, contentType } = req.query;

    if (!filename || !contentType) {
      return res.status(400).json({ error: "filename and contentType are required" });
    }

    const key = `uploads/${Date.now()}-${filename}`;

    const command = new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      ContentType: contentType,
    });

    const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 300 });
    const publicUrl = `https://${BUCKET}.s3.${REGION}.amazonaws.com/${key}`;

    return res.json({ uploadUrl, key, publicUrl });
  } catch (err) {
    console.error("Presign error:", err);
    return res.status(500).json({ error: "Failed to generate upload URL" });
  }
};
