import{ac as I,ad as w,j as t,R as k,S as j,ch as x,cl as b,aG as g,ci as u,aP as y,cy as _}from"./iframe-DbFLZ0zb.js";import{w as d,c as D}from"./ContextDecorators-BnxEfYpQ.js";import{F as N,A as v}from"./FullførtStilling-NBi2fuiO.js";import{R as T}from"./GjenåpneStillingKnapp-IY7oYb7U.js";import{T as A}from"./TilgangskontrollForInnhold-PzM5X6Y2.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-uirWz_eZ.js";import"./OrganisasjonsnummerAlert-BPfFuRiU.js";import"./VStack-BkCc1yDX.js";import"./BasePrimitive-CgkWumvN.js";import"./List-DI9WFelc.js";import"./Link-BazqRdLB.js";import"./KandidatHendelseTag-DX09_6iy.js";import"./Tag-DvDlcQfM.js";import"./ChatExclamationmark-DMJ-MqzE.js";import"./FileXMark-NauADuuW.js";import"./Trash-D6e790lM.js";import"./HandShakeHeart-Bw2OOiWo.js";import"./Calendar-CwVAoayr.js";import"./ThumbUp-0JCHZIXv.js";import"./Table-CiBbMHtd.js";import"./util-DVzjgWiD.js";import"./format-RWB3csbs.js";import"./match-C1npcLjZ.js";import"./parseISO-D6FxEAUm.js";import"./parse-DZBN-M-U.js";import"./getDefaultOptions-C2XsHj0b.js";import"./util-DXccvi6O.js";import"./accordion-CbwgFHCG.js";import"./index-Co-V0Nea.js";import"./index-B4C5uQX0.js";import"./index-Dt3iwA90.js";import"./ChevronDown-CSKcdQzq.js";import"./Box-s9P4rkdq.js";import"./Bell-CE64W5ys.js";import"./PersonChat-C9hHAdqL.js";import"./Eye-BoecXigm.js";import"./ProgressBar-Okcqu7Mq.js";import"./EyeSlash-C9zsKieN.js";import"./CircleSlash-B46QVLb_.js";import"./Modal-BxOrDhMO.js";import"./floating-ui.react-BsSqsGZq.js";import"./Date.Input-Cr-MtQ8S.js";import"./useFormField-B7aPxswA.js";import"./useControllableState-DCK-IQG-.js";import"./Modal.context-CWMVqGHt.js";import"./Checkbox-yOH5r9us.js";import"./Fieldset-G2O6tDgI.js";import"./Pencil-CWlPUU_Q.js";import"./PersonbrukerTekst-DBcnvRzh.js";import"./ClockDashed-B4CqxNcK.js";import"./Tasklist-CU2Q-5Pd.js";import"./ErrorBoundary-DvDZ6n8k.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),m=w(i,E),c=m.error;return c?.status===404||c?.message?.includes("404")||c&&!m.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[m],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Lt={tags:["autodocs"],component:n},l={render:()=>d(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>d(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return d(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return d(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />)
}`,...l.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />)
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => {
    // Lukket kandidatliste og stoppet stilling -> Fullført visning
    const stillingsData = {
      ...mockBaseStilling,
      stilling: {
        ...mockBaseStilling.stilling,
        status: 'INACTIVE',
        publishedByAdmin: mockBaseStilling.stilling.publishedByAdmin || new Date().toISOString()
      }
    } as typeof mockBaseStilling;
    const liste = createKandidatlisteMock({
      lukket: true,
      antall: 4,
      status: InternKandidatstatus.AKTUELL,
      utfall: KandidatutfallTyper.FATT_JOBBEN,
      stillingsData
    });
    return withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />, liste, stillingsData);
  }
}`,...a.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => {
    const stillingsData = mockFormidling as typeof mockBaseStilling;
    const liste = createKandidatlisteMock({
      stillingsData,
      antall: 2
    });
    return withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />, liste, stillingsData);
  }
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Lt as default};
