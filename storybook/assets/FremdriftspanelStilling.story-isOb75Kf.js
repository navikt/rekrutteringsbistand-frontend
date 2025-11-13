import{aE as I,M as w,j as t,q as k,S as x,cx as j,cF as b,cE as g,cy as u,P as y,cU as _}from"./iframe-D8-4xOqC.js";import{w as m,c as A}from"./ContextDecorators-D0OYvMcp.js";import{F as N,A as v}from"./FullførtStilling-DLBHvA2b.js";import{R as T}from"./GjenåpneStillingKnapp-Dd2yBAVP.js";import{T as E}from"./TilgangskontrollForInnhold-b5f6pW_x.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CKHm_AeS.js";import"./OrganisasjonsnummerAlert-BZQSof-U.js";import"./VStack-Csyu--T2.js";import"./BasePrimitive-SqCEysjS.js";import"./List-Cf5eDNuv.js";import"./Link-tQS8r4JE.js";import"./KandidatHendelseTag-3LzUL4w_.js";import"./Tag-CX-JbphV.js";import"./ChatExclamationmark-BgVP6Ccr.js";import"./FileXMark-60MOd4dt.js";import"./Trash-DjsmULNt.js";import"./HandShakeHeart-n157OPxh.js";import"./Calendar-CM-2s9vn.js";import"./ThumbUp-CgwsWvRJ.js";import"./Table-CjFE-4lz.js";import"./util-CGLOq6CR.js";import"./parse-Cc9pUomc.js";import"./getDefaultOptions-juMckS2Q.js";import"./parseISO-C_A1ZeST.js";import"./index-DHUfW4xb.js";import"./index-B40KJ5b4.js";import"./isBefore-CyeQ0GHU.js";import"./util-DGKfUUBU.js";import"./accordion-DPr8_gey.js";import"./index-C5QnaSI0.js";import"./index-Mg3_4qAH.js";import"./index-4jkPgmSH.js";import"./ChevronDown-CdyITUaA.js";import"./Box-C4oSLzQ5.js";import"./Bell-LLyRqIZr.js";import"./PersonChat-JlxZcjQY.js";import"./Eye-B5VOEIKq.js";import"./ProgressBar-knAbqglE.js";import"./EyeSlash-BQE9yz6O.js";import"./CircleSlash-A32MjbaE.js";import"./Modal-C1cLZQxk.js";import"./floating-ui.react-DdHAZyX-.js";import"./Date.Input-BehvWA5_.js";import"./useFormField-BPLkC9Pa.js";import"./useControllableState-C_sAK1x3.js";import"./Modal.context-D4VPuVea.js";import"./Checkbox-DEJZV3pP.js";import"./Fieldset-BRuNTXab.js";import"./Pencil-IRhQY7CL.js";import"./PersonbrukerTekst-DVbM_zFT.js";import"./ClockDashed-DneLIucr.js";import"./Tasklist-tu5z4GlI.js";import"./ErrorBoundary-CzKL0_E0.js";function n({dropDown:r}){const{stillingsData:i,erEier:D}=I(),d=w(i,D),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(E,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(E,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(x,{hooks:[d],children:e=>{const F=e.status===j.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Lt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=A({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=A({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
