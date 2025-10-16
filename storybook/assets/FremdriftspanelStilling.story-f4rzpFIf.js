import{ak as I,al as w,j as t,R as k,S as j,c7 as x,cy as b,c9 as g,cK as u,aK as y,cL as _}from"./iframe-Bm0iWSAX.js";import{w as d,c as D}from"./ContextDecorators-CCjiBzlj.js";import{F as N,A as v}from"./FullførtStilling-9pVvkl3-.js";import{R as T}from"./GjenåpneStillingKnapp-DAe_jpl5.js";import{T as A}from"./TilgangskontrollForInnhold-if2Npgek.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-DiPu0wP-.js";import"./OrganisasjonsnummerAlert-BiNTUKBU.js";import"./VStack-DeoVT_RF.js";import"./BasePrimitive-DSuUDil5.js";import"./List-6LowxMuQ.js";import"./Link-0ed56hQx.js";import"./KandidatHendelseTag-CL9EsGtt.js";import"./Tag-DtJZzZHV.js";import"./FileXMark-gmOMb3WS.js";import"./Trash-C2i0h2eW.js";import"./HandShakeHeart-CI8OTjR4.js";import"./Calendar-CtcWy-uR.js";import"./ThumbUp-B74QiFr9.js";import"./Table-DWtnJaPl.js";import"./util-DBYMKOy9.js";import"./format-7rGwuxAI.js";import"./match-BPcDNGi2.js";import"./parse-D4Igef4h.js";import"./getDefaultOptions-BR-nU7_j.js";import"./parseISO-D_SMTJVk.js";import"./util-Dz0LE6uV.js";import"./accordion-Bf7lqmie.js";import"./index-CsYDMZCR.js";import"./index-y658aRiC.js";import"./index-w7sEDaMt.js";import"./ChevronDown-CmedFOPk.js";import"./Box-D7jN4NLQ.js";import"./Bell-CuNQL6ww.js";import"./PersonChat-B22XQP02.js";import"./Eye-DhqI14IU.js";import"./ProgressBar-DftXN7rf.js";import"./EyeSlash-C0HFxsmC.js";import"./CircleSlash-48DcTfGp.js";import"./Modal-C85FhlMf.js";import"./floating-ui.react-DYGiiub_.js";import"./Date.Input-CHKMV-hr.js";import"./useFormField-B0esHqmv.js";import"./useControllableState-BnCX1B-b.js";import"./Modal.context-ClgWLOEW.js";import"./Checkbox-BnRn-HPQ.js";import"./Fieldset-CXazJRKK.js";import"./Pencil-CiEZBfEF.js";import"./PersonbrukerTekst-Dc50aib6.js";import"./ClockDashed-C6ohQF0z.js";import"./Tasklist-BxTOBoai.js";import"./ErrorBoundary-BVd9EDkl.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),m=w(i,E),c=m.error;return c?.status===404||c?.message?.includes("404")||c&&!m.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[m],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,K=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,B=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=B+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:K,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const vt={tags:["autodocs"],component:n},l={render:()=>d(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>d(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return d(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return d(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
