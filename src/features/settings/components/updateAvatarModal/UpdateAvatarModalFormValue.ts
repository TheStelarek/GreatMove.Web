import * as yup from 'yup';
import {
   MAX_PICTURE_SIZE,
   PICTURE_SUPPORTED_FORMATS,
} from '@/features/settings/components/updateAvatarModal/pictureValidationData';

export interface UpdateAvatarModalFormValue {
   picture: FileList;
}

export const UpdateAvatarModalValidationSchema = yup.object({
   picture: yup
      .mixed()
      .test(`required`, `You need to provide a new picture`, (value) => value && value.length)
      .test(
         `fileSize`,
         `The file is too large. Max is 2.5 MB`,
         (value) => value && value[0] && value[0].size <= MAX_PICTURE_SIZE,
      )
      .test(
         `type`,
         `We only support jpg/jpeg/png files`,
         (value) => value && value[0] && PICTURE_SUPPORTED_FORMATS.includes(value[0].type),
      ),
});
