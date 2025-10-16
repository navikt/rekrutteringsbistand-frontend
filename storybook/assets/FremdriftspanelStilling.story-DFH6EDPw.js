import{ac as I,ad as w,j as t,R as k,S as j,cn as x,cr as b,aG as g,co as u,aP as y,cD as _}from"./iframe-CcX8-4GA.js";import{w as d,c as A}from"./ContextDecorators-C_BPIZyP.js";import{F as N,A as v}from"./FullførtStilling-CrnL0Ee5.js";import{R as T}from"./GjenåpneStillingKnapp-BcdpUObr.js";import{T as D}from"./TilgangskontrollForInnhold-DtYh6h7p.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-2pjLwa4b.js";import"./OrganisasjonsnummerAlert-rbWDvMcL.js";import"./VStack-gF6g1u0a.js";import"./BasePrimitive-BUKns9Ma.js";import"./List-knAYMItp.js";import"./Link-RXPHszoE.js";import"./KandidatHendelseTag-Js6vMPxN.js";import"./Tag-jMajnUf2.js";import"./FileXMark-CFDEXvnD.js";import"./Trash-hb8-bWan.js";import"./HandShakeHeart-DQO3PzO_.js";import"./Calendar-DJqHZqeu.js";import"./ThumbUp-B39Bam7E.js";import"./Table-DoSv98b9.js";import"./util-BnKCOiCX.js";import"./format-DxFJCfdi.js";import"./match-BSotj6vx.js";import"./parseISO-Ciw9O8eu.js";import"./parse-h2sVsWqr.js";import"./getDefaultOptions-CYTM-JIK.js";import"./util-BVOBI2nQ.js";import"./accordion-CStz1Hfu.js";import"./index-CHuQ4d5z.js";import"./index-1H-m0WKd.js";import"./index-BIx0XTEC.js";import"./ChevronDown-BhCG83Hq.js";import"./Box-yv55sIW9.js";import"./Bell-bWMk9Kal.js";import"./PersonChat-ynR8cBDA.js";import"./Eye-BlaLFdEb.js";import"./ProgressBar-vcnNI4vP.js";import"./EyeSlash-DlejEfQm.js";import"./CircleSlash-Bjoa2vPr.js";import"./Modal-Ke8_CzKR.js";import"./floating-ui.react-CoAGIUUn.js";import"./Date.Input-DlRggdUa.js";import"./useFormField-B0V7Rwez.js";import"./useControllableState-CC5b_oP9.js";import"./Modal.context-CQY3-GGu.js";import"./Checkbox-BZVIsej_.js";import"./Fieldset-YvdBr5Io.js";import"./Pencil-DnlIFpyT.js";import"./PersonbrukerTekst-DXFk3XRY.js";import"./ClockDashed-C8s6wq8M.js";import"./Tasklist-BLV_Q4Vw.js";import"./ErrorBoundary-Bb19suKC.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),m=w(i,E),c=m.error;return c?.status===404||c?.message?.includes("404")||c&&!m.isLoading?t.jsx(D,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(D,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[m],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const vt={tags:["autodocs"],component:n},l={render:()=>d(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>d(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=A({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return d(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=A({stillingsData:r,antall:2});return d(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,vt as default};
