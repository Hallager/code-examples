import { SupabaseClient } from "npm:@supabase/supabase-js@2.45.6";
import { cleanBucketName } from "./text_helper.ts";

export async function list_files_in_folder(supabase: SupabaseClient, bucket_name: string, folder_name_base: string):Promise<string[]> {
    try {
        const { data: data_list_storage, error: error_list_storage } =
            await supabase.storage
                .from(bucket_name)
                .list(`${folder_name_base}`, {
                    sortBy: {
                        column: "name",
                        order: "asc",
                    },
                });

        if (error_list_storage) {
            return [`Listing files error ${bucket_name}/${folder_name_base}`];
        }

        return data_list_storage.map((x) => x.name);
    } catch (error: any) {
        return [error.toString()];
    }
}

export async function get_profile_url(
    supabase: SupabaseClient,
    account_name: string | null| undefined,
    institution_id: number | null,
    kid_id: string | null,
) {
    try {
        const bucket_name = `${account_name}`;
        const folder_name_base =
            `institution/${institution_id}/kid/${kid_id}/profile`;

        const { data: data_list_storage, error: error_list_storage } =
            await supabase.storage
                .from(bucket_name)
                .list(`${folder_name_base}`, {
                    limit: 1,
                    offset: 0,
                    sortBy: {
                        column: "name",
                        order: "asc",
                    },
                });

        if (error_list_storage) {
            return `Listing files error ${bucket_name}/${folder_name_base}`;
        }

        if (data_list_storage.length == 0) {
            return `Listing files length == 0 ${bucket_name}/${folder_name_base}`;
        }

        const { data: signedUrl, error: error_signedUrl } = await supabase
            .storage
            .from(bucket_name)
            .createSignedUrl(
                `${folder_name_base}/${data_list_storage[0].name}`,
                360,
            );

        if (error_signedUrl) {
            return `Listing files error signedUrl ${folder_name_base}/${data_list_storage[0].name}`;
        }

        return signedUrl.signedUrl;

    } catch (error) {
        console.log("get_profile_url", error);
        return "Listing files error" + error;
    }
}
