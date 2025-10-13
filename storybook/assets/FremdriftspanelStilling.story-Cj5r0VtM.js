import{h as I,j as t,aL as k,S as w,h_ as j,i9 as u,ia as x}from"./iframe-BUQyu22L.js";import{w as m,c as D}from"./ContextDecorators-CX1KhzC8.js";import{K as b}from"./schema.zod-C_LxQv7R.js";import{u as _}from"./useKandidatlisteForEier-CzqJjVc6.js";import{F as y,A as N}from"./FullførtStilling-aoPeXG_D.js";import{R as T}from"./GjenåpneStillingKnapp-BbqQw4Dr.js";import{K as g,I as v}from"./KandidatTyper-CkRsvxsW.js";import{T as A}from"./TilgangskontrollForInnhold-Dzlm5IG2.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-Oc2YEQYr.js";import"./OrganisasjonsnummerAlert-HgfTLFF3.js";import"./VStack-CGn3D2ul.js";import"./BasePrimitive-FFlifB9L.js";import"./List-D1fXqFcu.js";import"./Link-7-Oyqc8P.js";import"./KandidatHendelseTag-CAErOFug.js";import"./Tag-DKWFjTWP.js";import"./FileXMark-Ba31hRg_.js";import"./Trash-DWqto8FP.js";import"./HandShakeHeart-DtmDZ5Om.js";import"./Calendar-DPzQKUJ3.js";import"./ThumbUp-CVt-YD8L.js";import"./Table-BeAuNowr.js";import"./util-CsSeV2vQ.js";import"./format-BPuRaoZf.js";import"./match-OW4j9hbd.js";import"./parseISO-KKd5I4hj.js";import"./parse-DTWVFV5V.js";import"./getDefaultOptions-CUeIb0d6.js";import"./util-AmAm__yB.js";import"./kandidat.mock-hNRcr5wn.js";import"./innsatsgrupper-BqldBv0r.js";import"./accordion-CtMBgxxg.js";import"./index-C7uaL3G5.js";import"./index-CNKWICYE.js";import"./index-CiXl63GA.js";import"./ChevronDown-Pb-PecvL.js";import"./Box-BS8y_QQH.js";import"./Bell-BbhxmBeM.js";import"./PersonChat-B18cB0RY.js";import"./Eye-v_rDD6k7.js";import"./ProgressBar-CnJSTHyM.js";import"./oppdaterStilling-BH-g063Y.js";import"./EyeSlash-BngFu_sE.js";import"./CircleSlash-DmpDqtsY.js";import"./Modal-BhRDrGLS.js";import"./floating-ui.react-D0JeriZz.js";import"./Date.Input-ptuSiYm_.js";import"./useFormField-B836Dc7y.js";import"./useControllableState-wse2apKA.js";import"./Modal.context-CRMP9zga.js";import"./Checkbox-C19TPl4f.js";import"./Fieldset-B8--t37q.js";import"./Pencil-CB9RoQ0q.js";import"./PersonbrukerTekst-4Pmm2nuE.js";import"./ClockDashed-Do4Onhmm.js";import"./Tasklist-C5fPHHBx.js";import"./ErrorBoundary-Dib0japv.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=_(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(w,{hooks:[d],children:e=>{const F=e.status===b.Lukket&&i.stilling.status===j.Stoppet,f=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,K=e?.kandidater.filter(s=>s.utfallsendringer.some(R=>R.sendtTilArbeidsgiversKandidatliste===!0)).length??0,B=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,h=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,S=B+h;return F?t.jsx(y,{dropDown:r,totalStillinger:f,antallFåttJobben:S}):t.jsx(N,{antallFåttJobben:S,antallDelt:K,totalStillinger:f,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Ot={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:v.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=x,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Ot as default};
