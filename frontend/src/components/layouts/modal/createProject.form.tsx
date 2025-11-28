'use client';

import Project from '../sidenav/ribbon/project/project';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { useOverlay } from '@/contexts/useOverlays';
import { ColorInput } from './color.input';
import { COLOR_MAP } from '@/lib/ui/colors';
import { safe } from '@/lib/safe.utils';
import { api } from '@/lib/axios.client';
import { handleError } from '@/lib/error.handler';

export interface CreateProjectValues {
  projectName: string;
  color: keyof typeof COLOR_MAP;
}

export function CreateProjectForm() {
  const { closeModal } = useOverlay();
  const {
    register,
    control,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: '',
      icon: 'chat',
      color: 'gray',
    },
  });

  const watchedIcon = watch('icon');
  const watchedColor = watch('color');

  const onSubmit = async (data: CreateProjectValues) => {
    const [, projectError] = await safe(api.post('/api/v1/projects', data));
    if (projectError) return handleError(projectError, setError);

    closeModal();
    return;
  };

  return (
    <>
      <h1 className="text-xl font-bold text-nowrap text-white text-center">Create Project</h1>

      <form className="flex flex-col gap-6" onClick={handleSubmit(onSubmit)}>
        <div className="w-full h-min flex flex-col gap-2 items-center">
          <Project project={{ icon: watchedIcon, color: watchedColor }} size="lg" />
          <p className="text-sm text-foreground/50">Click to change icon</p>
        </div>

        <div className="w-min h-min flex flex-col gap-2">
          <label className="text-foreground/50 font-bold text-sm">Project Name</label>

          <Input
            placeholder="Project name"
            className="min-w-60 max-w-88 w-88"
            {...register('name')}
          />
        </div>

        <ColorInput label="Project color" control={control} name="color" />

        <div className="w-full h-min flex gap-4 text-foreground mt-4">
          <button
            className="w-full h-min px-6 py-3 bg-foreground/2 rounded-md hover:bg-foreground/4 transition-colors"
            onClick={closeModal}
          >
            Cancel
          </button>

          <button
            className="w-full h-min px-6 py-3 bg-accent-blue-200 rounded-md hover:bg-accent-blue-100 transition-colors"
            type="submit"
          >
            Create
          </button>
        </div>
      </form>
    </>
  );
}
