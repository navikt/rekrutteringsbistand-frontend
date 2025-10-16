import{ax as I,ay as w,j as t,R as k,S as x,c7 as j,cy as y,c9 as g,cK as u,aL as b,cL as _}from"./iframe-Dztpy7FG.js";import{w as d,c as D}from"./ContextDecorators-AH49Hb38.js";import{F as N,A as v}from"./FullførtStilling-DIhLZyxe.js";import{R as T}from"./GjenåpneStillingKnapp-CGWF3woF.js";import{T as A}from"./TilgangskontrollForInnhold-CZM8COQT.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CIQvoNAt.js";import"./OrganisasjonsnummerAlert-B5xMY7sy.js";import"./VStack-HNw6XBKh.js";import"./BasePrimitive-_IOgqcZV.js";import"./List-C7JKrr3p.js";import"./Link-eQW3hoy3.js";import"./KandidatHendelseTag-DocFfSvE.js";import"./Tag-CXuRSAQ-.js";import"./FileXMark-jygYJjCP.js";import"./Trash-DATitZQq.js";import"./HandShakeHeart-B6A8Mj0o.js";import"./Calendar-B350-cZ5.js";import"./ThumbUp-C9MoaVk0.js";import"./Table-CsiZs3Xs.js";import"./util-BZe5o9jQ.js";import"./format-mY-HadcG.js";import"./match-BCVUXymx.js";import"./parse-DMRhBhLM.js";import"./getDefaultOptions-ENb9g62e.js";import"./parseISO-DoJZVqXh.js";import"./util-DfjJrChK.js";import"./accordion-IPthumKB.js";import"./index-BuYMK4rC.js";import"./index-CEfk8ATG.js";import"./index-CIb9T6ti.js";import"./ChevronDown-frGHGn0T.js";import"./Box-CsjaTTfH.js";import"./Bell-C_ZJ-XGp.js";import"./PersonChat-DeQyWVOf.js";import"./Eye-DHvgaoVA.js";import"./ProgressBar-z_xY5vDL.js";import"./EyeSlash-BuouL6IQ.js";import"./CircleSlash-CQg2jHdr.js";import"./Modal-CjeWp7Ef.js";import"./floating-ui.react-CvX8JUjW.js";import"./Date.Input-DH1XvPbb.js";import"./useFormField-avTKDxfH.js";import"./useControllableState-CeZ8CCVf.js";import"./Modal.context-Dr-JJuFN.js";import"./Checkbox-B_ja4uRu.js";import"./Fieldset-C4phmzzq.js";import"./Pencil-DkLhSrLU.js";import"./PersonbrukerTekst-C2gY-fYl.js";import"./ClockDashed-AAPj5KOe.js";import"./Tasklist-D5wY4rw9.js";import"./ErrorBoundary-aVaxGB0z.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),m=w(i,E),c=m.error;return c?.status===404||c?.message?.includes("404")||c&&!m.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(x,{hooks:[m],children:e=>{const F=e.status===j.Lukket&&i.stilling.status===y.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const vt={tags:["autodocs"],component:n},l={render:()=>d(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>d(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:b.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return d(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return d(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
