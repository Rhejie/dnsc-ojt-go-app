import { ElNotification } from "element-plus";
import { ref } from "vue";
import { http, httpFile, httpServer } from "../http_service";


export const getFileRequirements = () => {
    const requirements = ref([]);

    const loadingRequirements = ref(false)

    const loadRequirements = async () => {
        loadingRequirements.value = true
        await http().get('/user/file/requirements').then(res => {
            requirements.value = res.data
            loadingRequirements.value = false
        }).catch(error => {
            console.log('Error in getting requirements -->', error)
        })
    }

    return {
        loadRequirements,
        requirements,
        loadingRequirements
    }
}

export const fileUpload = async (file) => {
    const uploadProgress = ref(0);
    const loadingUploading = ref(true)
    const fileres = ref()
    await httpServer().post('api/user/file/requirements', file, {
        onUploadProgress: function ( progressEvent ) {
            uploadProgress.value = parseInt( Math.round( ( progressEvent.loaded * 100 ) / progressEvent.total ) )
            console.log(uploadProgress.value, 'progress');
        }
    }).then((res) => {
        loadingUploading.value = false
        fileres.value = res.data
        ElNotification({
            title: 'Success',
            message: 'Successfully Uploaded!',
            type: 'success',
          })
    })

    return {
        uploadProgress,
        loadingUploading,
        fileres
    }
}

export const getFiles = (id) => {
    const files = ref([])
    const loadingFiles = ref(false)
    const loadFiles = async () => {
        loadingFiles.value = true 
        await http().get(`/user/file/files/${id}`).then(res => {
            files.value  = res.data
            loadingFiles.value = false
        }).catch(error => {
            console.log(error)
        })
    }

    return {
        loadFiles,
        loadingFiles,
        files
    }
}

export const downloadFile = async (id) => {
    return await httpFile().get(`/user/file/download/${id}`);
}