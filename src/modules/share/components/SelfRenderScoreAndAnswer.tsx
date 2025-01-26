import PropTypes from 'prop-types'
import Typography from 'components/Typography'
import { Controller, useFormContext } from 'react-hook-form'
import ScoredField from 'components/ScoredField'
import classNames from 'classnames'
import { CustomTextArea } from 'components/TextArea'
import { useTranslation } from 'react-i18next'

export default function SelfRenderScoreAndAnswer({ valueRange, placeholder, disabled, nameGetValue, index }) {
  const { control } = useFormContext()
  const { t } = useTranslation()

  const range = [...Array(valueRange)]

  const renderListScore = (value, disabled) => {
    return range.map((_, i) => (
      <div
        key={i}
        onClick={() => {
          if (disabled) {
            return
          }
        }}
        className={classNames(
          'w-[1.875rem] h-[1.875rem] transition ease-in-out text-[1rem] flex rounded-full border-solid items-center justify-center border',
          {
            'bg-primary-500 text-white': i + 1 === Number(value),
            'hover:-translate-y-1 hover:border-primary-500': i + 1 !== Number(value) && !disabled,
            'text-gray-800 border-gray-500': i + 1 !== Number(value) && !disabled,
            'text-gray-400 bg-gray-100 border-gray-300': i + 1 !== Number(value) && disabled,
            'cursor-not-allowed': disabled,
            'cursor-pointer': !disabled
          }
        )}
      >
        <Typography
          className={classNames({
            'bg-primary-500 text-white': i + 1 === Number(value),
            'text-gray-800': i + 1 !== Number(value) && !disabled,
            'text-gray-400': i + 1 !== Number(value) && disabled
          })}
        >
          {i + 1}
        </Typography>
      </div>
    ))
  }

  return (
    <div className='flex flex-col gap-4 h-full'>
      <div className='flex justify-between'>
        <Controller
          name={`${nameGetValue}.${index}.scored`}
          control={control}
          // rules={{ required: true }}
          render={({ field: { value }, fieldState: { error } }) => {
            return (
              <ScoredField
                className=''
                error={!!error}
                children={renderListScore(value, disabled)}
                helperText={t('common.requiredInfo')}
              />
            )
          }}
        />
      </div>

      <div className='flex-1 h-full'>
        <Controller
          name={`${nameGetValue}.${index}.contentSelfEvaluation`}
          control={control}
          render={({ field: { value }, fieldState: { error } }) => {
            return (
              <CustomTextArea
                value={value}
                disabled={disabled}
                error={!!error}
                helperText={t('common.requiredInfo')}
                className='min-h-[120px]'
                minHeight='min-h-[120px]'
                placeholder={placeholder}
                minRows={4}
                maxRows={30}
                maxLength={2000}
              />
            )
          }}
        />
      </div>
    </div>
  )
}

SelfRenderScoreAndAnswer.propTypes = {
  valueRange: PropTypes.number,
  questionId: PropTypes.number,
  placeholder: PropTypes.string,
  answerSubmitted: PropTypes.object,
  disabled: PropTypes.bool,
  onChange: PropTypes.func
}
