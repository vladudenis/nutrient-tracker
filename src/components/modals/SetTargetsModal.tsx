import { useDisclosure } from '@mantine/hooks'
import { Loader2, Target } from 'lucide-react'
import { useForm, Controller } from 'react-hook-form'
import { useState } from 'react'
import {
    Button,
    Modal,
    Stepper,
    Group,
    Input,
    NumberInput,
    Select,
} from '@mantine/core'
import { useMutation, useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'

export default function SetTargetsModal({ session }: { session: any }) {
    const healthParameters = useQuery(
        api.healthParameters.fetchHealthParameters,
        { user: session?.user?.email || '' }
    )
    const saveHealthParameters = useMutation(
        api.healthParameters.saveHealthParameters
    )
    const updateHealthParameters = useMutation(
        api.healthParameters.updateHealthParameters
    )

    const { setValue, control, handleSubmit } = useForm()
    const [opened, { open, close }] = useDisclosure(false)
    const [isLoading, setIsLoading] = useState(false)
    const [active, setActive] = useState(0)
    const [formData, setFormData] = useState(healthParameters)

    const nextStep = () =>
        setActive((current) => (current < 3 ? current + 1 : current))
    const prevStep = () =>
        setActive((current) => (current > 0 ? current - 1 : current))

    const onSubmit = async (data: any) => {
        setFormData(data)

        if (active < 2) {
            nextStep()
            return
        }

        if (healthParameters) {
            await updateHealthParameters({ ...data })
            return
        }

        await saveHealthParameters({ ...data })
    }

    return (
        <>
            <button
                onClick={open}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
                <Target />
                <span className="ms-3">Set Targets</span>
            </button>

            <Modal
                opened={opened}
                onClose={close}
                title="Set Nutrition Targets"
                size="xl"
                centered
            >
                <form className="p-4" onSubmit={handleSubmit(onSubmit)}>
                    <Stepper active={active} onStepClick={setActive}>
                        <Stepper.Step
                            label="Status"
                            description="Set Body Parameters"
                        >
                            <div className="flex gap-5 mt-3">
                                <Input.Wrapper label="Age" size="md">
                                    <NumberInput
                                        onChange={(value) =>
                                            setValue('age', value)
                                        }
                                        defaultValue={
                                            formData
                                                ? //@ts-ignore
                                                  formData.age
                                                : undefined
                                        }
                                        placeholder="Enter Age"
                                        size="md"
                                        max={120}
                                        min={1}
                                    />
                                </Input.Wrapper>
                                <Controller
                                    name="sex"
                                    control={control}
                                    defaultValue={
                                        formData
                                            ? //@ts-ignore
                                              formData.sex
                                            : undefined
                                    }
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            label="Sex"
                                            placeholder="Enter Sex"
                                            data={['Male', 'Female']}
                                            size="md"
                                            clearable
                                        />
                                    )}
                                />
                                <Input.Wrapper label="Height" size="md">
                                    <NumberInput
                                        onChange={(value) =>
                                            setValue('height', value)
                                        }
                                        defaultValue={
                                            formData
                                                ? //@ts-ignore
                                                  formData.height
                                                : undefined
                                        }
                                        placeholder="Enter Height"
                                        size="md"
                                        rightSection={
                                            <p className="mr-2">cm</p>
                                        }
                                        max={300}
                                        min={50}
                                    />
                                </Input.Wrapper>
                                <Input.Wrapper label="Weight" size="md">
                                    <NumberInput
                                        onChange={(value) =>
                                            setValue('weight', value)
                                        }
                                        defaultValue={
                                            formData
                                                ? //@ts-ignore
                                                  formData.weight
                                                : undefined
                                        }
                                        placeholder="Enter Weight"
                                        size="md"
                                        rightSection={
                                            <p className="mr-2">kg</p>
                                        }
                                        max={10}
                                        min={500}
                                    />
                                </Input.Wrapper>
                            </div>
                        </Stepper.Step>
                        <Stepper.Step
                            label="Plan"
                            description="Set Macro Targets"
                        >
                            <div className="flex items-center gap-5 mt-3">
                                <Input.Wrapper label="Target Calories">
                                    <NumberInput
                                        onChange={(value) =>
                                            setValue('targetCal', value)
                                        }
                                        defaultValue={
                                            formData
                                                ? //@ts-ignore
                                                  formData.targetCal
                                                : undefined
                                        }
                                        placeholder="Enter Calories"
                                        size="md"
                                        rightSection={
                                            <p className="mr-2">kcal</p>
                                        }
                                        max={99999}
                                        min={500}
                                    />
                                </Input.Wrapper>
                                <Input.Wrapper label="Target Fat">
                                    <NumberInput
                                        onChange={(value) =>
                                            setValue('targetFat', value)
                                        }
                                        defaultValue={
                                            formData
                                                ? //@ts-ignore
                                                  formData.targetFat
                                                : undefined
                                        }
                                        placeholder="Enter Fat"
                                        size="md"
                                        rightSection={<p className="mr-2">%</p>}
                                        max={100}
                                        min={1}
                                    />
                                </Input.Wrapper>
                                <Input.Wrapper label="Target Protein">
                                    <NumberInput
                                        onChange={(value) =>
                                            setValue('targetProtein', value)
                                        }
                                        defaultValue={
                                            formData
                                                ? //@ts-ignore
                                                  formData.targetProtein
                                                : undefined
                                        }
                                        placeholder="Enter Protein"
                                        size="md"
                                        rightSection={<p className="mr-2">%</p>}
                                        max={100}
                                        min={1}
                                    />
                                </Input.Wrapper>
                                <Input.Wrapper label="Target Carbohydrates">
                                    <NumberInput
                                        onChange={(value) =>
                                            setValue('targetCarbs', value)
                                        }
                                        defaultValue={
                                            formData
                                                ? //@ts-ignore
                                                  formData.targetCarbs
                                                : undefined
                                        }
                                        placeholder="Enter Carbs"
                                        size="md"
                                        rightSection={<p className="mr-2">%</p>}
                                        max={100}
                                        min={1}
                                    />
                                </Input.Wrapper>
                            </div>
                        </Stepper.Step>
                        <Stepper.Step
                            label="Overview"
                            description="View Summary"
                        >
                            <div className="flex justify-center gap-36">
                                <div className="flex flex-col items-center gap-5 mt-3">
                                    <div className="flex gap-2">
                                        <span>Age:</span>
                                        {/*@ts-ignore */}
                                        <span>{formData?.age}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <span>Sex:</span>
                                        {/*@ts-ignore */}
                                        <span>{formData?.sex}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <span>Height:</span>
                                        {/*@ts-ignore */}
                                        <span>{formData?.height}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <span>Weight:</span>
                                        {/*@ts-ignore */}
                                        <span>{formData?.weight}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center gap-5 mt-3">
                                    <div className="flex gap-2">
                                        <span>Target Calories:</span>
                                        <span>
                                            {/*@ts-ignore */}
                                            {formData?.targetCal}kcal
                                        </span>
                                    </div>
                                    <div className="flex gap-2">
                                        <span>Target Fat:</span>
                                        <span>
                                            {/*@ts-ignore */}
                                            {formData?.targetFat}g
                                        </span>
                                    </div>
                                    <div className="flex gap-2">
                                        <span>Target Protein:</span>
                                        <span>
                                            {/*@ts-ignore */}
                                            {formData?.targetProtein}g
                                        </span>
                                    </div>
                                    <div className="flex gap-2">
                                        <span>Target Carbohydrates:</span>
                                        <span>
                                            {/*@ts-ignore */}
                                            {formData?.targetCarbs}g
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Stepper.Step>
                    </Stepper>

                    <Group justify="center" mt="xl">
                        <Button variant="default" onClick={prevStep}>
                            Previous
                        </Button>
                        {isLoading ? (
                            <Button type="submit">
                                <Loader2 className="animate-spin mr-2" />
                                Submit
                            </Button>
                        ) : active == 2 ? (
                            <Button type="submit">Submit</Button>
                        ) : (
                            <Button type="submit">Next</Button>
                        )}
                    </Group>
                </form>
            </Modal>
        </>
    )
}
