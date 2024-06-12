import api from "@/app/_services/GlobalApi";

export const uploadFile = async (file) => {
    // hygraph file upload with createAsset
    const graphqlUploadRes = await api.createAsset();

    const postReqBody = graphqlUploadRes.createAsset.upload.requestPostData;

    const id = graphqlUploadRes.createAsset.id;



    const formData = new FormData();

    formData.append('X-Amz-Date', postReqBody.date);
    formData.append('key', postReqBody.key);
    formData.append('X-Amz-Signature', postReqBody.signature);
    formData.append('X-Amz-Algorithm', postReqBody.algorithm);
    formData.append('policy', postReqBody.policy);
    formData.append('X-Amz-Credential', postReqBody.credential);
    formData.append('X-Amz-Security-Token', postReqBody.securityToken);
    formData.append('file', file);


    const postRes = await fetch(postReqBody.url, {
        method: "POST",
        body: formData,
    })


    // wait 1 second with pormise and timeout
    await new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 2000);
    });


    if (postRes.ok) {
        const publishRes = await api.publishAsset(graphqlUploadRes.createAsset.id)

        return id;
    } else {
        throw new Error("File upload failed")
    }
}