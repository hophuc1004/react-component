import size from 'lodash/size'
import isEmpty from 'lodash/isEmpty'

export const getTableConfigs = (columns) => {
  const accessors = []
  const groupHeaders = []
  const groupSubHeaders = []
  let groupChildHeaders = []

  const convertData = (
    {
      header,
      subHeader,
      borderBottomColor,
      colSpan,
      align,
      childColumns,
      subTitle,
      accessorKey,
      childHeader,
      textColor,
      childAlign,
      childWidth,
      width,
      subWidth,
      isShowTooltip,
      childTypography,
      isSticky,
      isShowModal,
      fontWeight,
      stageIAId,
      isEvaluatedIa,
      ...rest
    },
    idx
  ) => {
    if (accessorKey) {
      accessors.push({
        accessorKey,
        childHeader,
        textColor,
        childAlign,
        childWidth,
        isShowTooltip,
        childTypography,
        isShowModal,
        fontWeight,
        isEvaluatedIa,
        stageIAId
      })
    }

    if (header) {
      groupHeaders.push({
        header,
        subWidth,
        borderBottomColor,
        colSpan,
        align,
        childWidth,
        width,
        subTitle,
        childTypography,
        isSticky,
        isShowModal,
        fontWeight,
        stageIAId,
        isEvaluatedIa,
        ...rest
      })
    }

    if (subHeader) {
      groupSubHeaders.push({
        subHeader,
        subWidth,
        borderBottomColor,
        colSpan,
        align,
        childWidth,
        width,
        subTitle,
        childTypography,
        isSticky,
        isShowModal,
        fontWeight,
        stageIAId,
        isEvaluatedIa,
        ...rest
      })
    }

    if (!isEmpty(childColumns)) {
      groupChildHeaders = groupChildHeaders.concat(childColumns)
    }

    if (size(childColumns)) {
      childColumns?.forEach((col) => convertData(col, idx + 1))
    }
  }

  columns.forEach((col) => convertData(col, 0))

  return { accessors, groupHeaders, groupSubHeaders, groupChildHeaders }
}
