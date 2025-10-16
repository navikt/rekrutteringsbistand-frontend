import{ac as I,ad as w,j as t,R as k,S as x,ch as j,cl as b,aG as g,ci as u,aP as y,cx as _}from"./iframe-CnEkfJjQ.js";import{w as d,c as D}from"./ContextDecorators-CZZjZOOl.js";import{F as N,A as v}from"./FullførtStilling-01GQDIlC.js";import{R as T}from"./GjenåpneStillingKnapp-ByFajBDe.js";import{T as A}from"./TilgangskontrollForInnhold-ACU_pYaj.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-HIRI-J95.js";import"./OrganisasjonsnummerAlert-B23Jmmg0.js";import"./VStack-D3_cDo5O.js";import"./BasePrimitive-CJsxFWaA.js";import"./List-CMa3XxGU.js";import"./Link-Bub8b3KC.js";import"./KandidatHendelseTag-B5dnEu9y.js";import"./Tag-DmHnnT3j.js";import"./ChatExclamationmark-CaxCUB7e.js";import"./FileXMark-Bpe-BWEB.js";import"./Trash-DLfbYG6b.js";import"./HandShakeHeart-G1PY24Kb.js";import"./Calendar-C6MR1ehC.js";import"./ThumbUp-BqHABY98.js";import"./Table-CftjquAj.js";import"./util-C2UfT_2f.js";import"./format-Dd_rkWUl.js";import"./match-CfPkVkUS.js";import"./parseISO-CaaYQBsI.js";import"./parse-Cx8TZIRr.js";import"./getDefaultOptions-0dENDqjq.js";import"./util-BX4E7U5l.js";import"./accordion-B3Q1O0zM.js";import"./index-mC8cLfKH.js";import"./index-BgcqZSaC.js";import"./index-DKkxR9LD.js";import"./ChevronDown-BA6G5vv2.js";import"./Box-V6v2cQsd.js";import"./Bell-C6zpITcj.js";import"./PersonChat-JrZzQVkS.js";import"./Eye-KGapSk3V.js";import"./ProgressBar-Bm9dZzNe.js";import"./EyeSlash-DKEkzG0U.js";import"./CircleSlash-C-mA8Cq2.js";import"./Modal-aZ-miv_B.js";import"./floating-ui.react-CS8Kbatp.js";import"./Date.Input-CkEuVDaW.js";import"./useFormField-yhmtRsl4.js";import"./useControllableState-D9VP06Xz.js";import"./Modal.context-Wi_6ZnAF.js";import"./Checkbox-CHki3mEv.js";import"./Fieldset-BHZTK4vD.js";import"./Pencil-DKbE5lfO.js";import"./PersonbrukerTekst-DGkzmJoV.js";import"./ClockDashed-DvMCfqku.js";import"./Tasklist-DaWt8Uf_.js";import"./ErrorBoundary-CcGIYTTX.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),m=w(i,E),c=m.error;return c?.status===404||c?.message?.includes("404")||c&&!m.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(x,{hooks:[m],children:e=>{const F=e.status===j.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Lt={tags:["autodocs"],component:n},l={render:()=>d(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>d(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return d(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return d(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
