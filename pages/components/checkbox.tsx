import type { NextPage } from "next";
import Head from "next/head";
import type { ChangeEvent } from "react";
import { useState } from "react";
import styled from "styled-components";

import { CountingInput } from "../../components/CountingInput";
import { DefaultInput } from "../../components/Input";
import { Preview } from "../../components/Preview";
import { StylingHeader } from "../../components/StylingHeader";
import {
  BootstrapDarkInputButton,
  BootstrapLightInputButton
} from "../../components/Button";
import { theme } from "../../theme";
import { CountNumberType } from "../../types/count";
import { CustomSelect } from "../../components/CustomSelect";
import type { SelectOption } from "../../types/select";
import * as Component from "../../components/partial/Component";
import * as Preset from "../../components/partial/Preset";
import * as Option from "../../components/partial/Option";
import { RequireLabel } from "../../components/RequireLabel";
import { templateOptions } from "../../components/options/Template";
import {
  StyleObjectToString,
  StyleProperties
} from "../../lib/style/to-string";
import { WithLabel } from "../../components/WithLabel";
import { Checkbox } from "../../components/Checkbox";
import { mixinEllipsisText } from "../../theme/mixins/text";

const StyledInput = styled.input<{
  label: string;
  color: string;
  fontSize: number;
  scale: number;
}>`
  position: relative;
  transform: scale(${({ scale }) => scale});

  &:before {
    content: "${({ label }) => label}";

    position: absolute;
    top: 50%;
    left: calc(100% + 5px);
    transform: translate3d(0, -50%, 0);
    color: ${({ color }) => color};
    font-size: ${({ fontSize }) => fontSize}px;
    width: ${({ scale }) => 100 / scale}px;

    ${mixinEllipsisText}
  }
`;

const ComponentCheckbox: NextPage = () => {
  const [label, setLabel] = useState("Checkbox");

  const [scale, setScale] = useState(1.2);

  const [color, setColor] = useState("#000000");

  const [template, setTemplate] = useState<SelectOption>(templateOptions[0]);
  // html 템플릿 추가 여부
  const [html, setHtml] = useState(false);

  const [fontSize, setFontSize] = useState(16);

  const handleChangeLabel = (evt: ChangeEvent<HTMLInputElement>) => {
    setLabel(evt.target.value);
  };

  const handleChangeColor = (evt: ChangeEvent<HTMLInputElement>) => {
    setColor(evt.target.value);
  };

  const handleChangeHtml = (evt: ChangeEvent<HTMLInputElement>) => {
    setHtml(evt.target.checked);
  };

  const handleClickPresetBootstrapLightButton = () => {
    setColor(theme.color.white);
    setFontSize(16);
  };

  const handleClickPresetBootstrapDarkButton = () => {
    setColor(theme.color.darkTextColor_lv0);
    setFontSize(16);
  };

  const handleExport = () => {
    const style: StyleProperties = {
      color,
      fontSize
    };

    const exportToHtml = new StyleObjectToString(style);

    if (template.value === "default") {
      exportToHtml.convertInput("checkbox");
    } else if (template.value === "style-and-el") {
      exportToHtml.convertInputWithClass("checkbox");
    }

    if (html) {
      exportToHtml.addTemplate();
    }

    exportToHtml.saveInClipboard();
  };

  return (
    <>
      <Head>
        <title>Components - Input</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Header>
        <Title>Components</Title>
        <Description>
          Select an element and style the component as desired. You can copy the
          styling as it is and move it to your web page for use.
        </Description>
      </Header> */}

      <Component.Container>
        <Component.Aside>
          <Preview
            width={Math.round(13 * scale)}
            height={Math.round(13 * scale)}
            onExport={handleExport}
          >
            <StyledInput
              type="checkbox"
              label={label}
              color={color}
              fontSize={fontSize}
              scale={scale}
            />
          </Preview>
          {/* <Preset.Container>
            <StylingHeader>Preset</StylingHeader>
            <Preset.Body>
              <Preset.Item>
                <Preset.ButtonPreview>
                  <BootstrapLightInputButton
                    type="button"
                    onClick={handleClickPresetBootstrapLightButton}
                  >
                    Light
                  </BootstrapLightInputButton>
                </Preset.ButtonPreview>
                <Preset.ButtonMeta>
                  <span>Bootstrap Light</span>
                </Preset.ButtonMeta>
              </Preset.Item>
              <Preset.Item>
                <Preset.ButtonPreview>
                  <BootstrapDarkInputButton
                    type="button"
                    onClick={handleClickPresetBootstrapDarkButton}
                  >
                    Dark
                  </BootstrapDarkInputButton>
                </Preset.ButtonPreview>
                <Preset.ButtonMeta>
                  <span>Bootstrap Dark</span>
                </Preset.ButtonMeta>
              </Preset.Item>
            </Preset.Body>
          </Preset.Container> */}
        </Component.Aside>
        <Option.Container>
          <StylingHeader>Options</StylingHeader>

          <Option.Body>
            <Option.Grid>
              <Option.Title>기본 설정</Option.Title>
              <Option.Item>
                <RequireLabel htmlFor="setLabel">설명</RequireLabel>
                <DefaultInput
                  id="setLabel"
                  value={label}
                  onChange={handleChangeLabel}
                  autoComplete="off"
                />
              </Option.Item>
              <Option.Item>
                <RequireLabel htmlFor="setColor">글자 색</RequireLabel>
                <DefaultInput
                  id="setColor"
                  type="color"
                  value={color}
                  onChange={handleChangeColor}
                />
              </Option.Item>

              <Option.Title>레이아웃 설정</Option.Title>
              <Option.Item>
                <RequireLabel htmlFor="setScale">체크박스 크기</RequireLabel>
                <CountingInput
                  id="setScale"
                  ariaLabel="배경색 Alpha"
                  count={scale}
                  setCount={setScale}
                  limit={5}
                  showIcon={true}
                  showFeedback={true}
                  numberType={CountNumberType.DECIMAL}
                  unit=""
                />
              </Option.Item>

              <Option.Item>
                <RequireLabel htmlFor="setFontSize">글자 크기</RequireLabel>
                <CountingInput
                  id="setFontSize"
                  ariaLabel="글자 크기"
                  count={fontSize}
                  setCount={setFontSize}
                  limit={30}
                  showIcon={true}
                  showFeedback={true}
                  numberType={CountNumberType.INTEGER}
                  unit="px"
                />
              </Option.Item>

              <Option.Title>환경 설정</Option.Title>
              <Option.Item>
                <RequireLabel htmlFor="setTemplate">템플릿</RequireLabel>
                <CustomSelect
                  activeOption={template}
                  setOption={setTemplate}
                  options={templateOptions}
                />
                <WithLabel id="setHtml" label="HTML 템플릿 추가">
                  <Checkbox
                    id="setHtml"
                    checked={html}
                    onChange={handleChangeHtml}
                  />
                </WithLabel>
              </Option.Item>
            </Option.Grid>
          </Option.Body>
        </Option.Container>
      </Component.Container>
    </>
  );
};

export default ComponentCheckbox;
