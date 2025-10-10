import{j as t,e as k}from"./iframe--aQMagBM.js";import{w as m,c as D}from"./ContextDecorators-CqoRcnGw.js";import{K as I}from"./schema.zod-Dbb9fblv.js";import{u as w}from"./useKandidatlisteForEier-l_MuYz3a.js";import{a as j}from"./StillingsContext-DZ7500xJ.js";import{R as T,F as x,A as b}from"./FullførtStilling-CDglxhT-.js";import{K as g,I as y}from"./KandidatTyper-CkRsvxsW.js";import{a as _}from"./stilling-typer-DLlwa7NU.js";import{S as N}from"./SWRLaster-CS2y56Xc.js";import{T as A}from"./TilgangskontrollForInnhold-BHQ4jxba.js";import{m as u,a as v}from"./stillingMock-BtxAEQoL.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-fubJ-EHq.js";import"./OrganisasjonsnummerAlert-Dd25ZFhX.js";import"./VStack-CcHbObW-.js";import"./BasePrimitive-CgaIh8hS.js";import"./List-3rCESo3E.js";import"./Link-BOoQ8up8.js";import"./KandidatHendelseTag-D1ik4fHf.js";import"./Tag-58wlhy8F.js";import"./FileXMark-BqGqkZBh.js";import"./Trash-BqYkRCE7.js";import"./HandShakeHeart-Blgv2ubq.js";import"./Calendar-B-VLWjRU.js";import"./ThumbUp-CTaI1ELg.js";import"./Table-CZNZ724A.js";import"./util-DSiroPk9.js";import"./format-MMJ3lUv3.js";import"./startOfDay-lTP3GKUn.js";import"./match-D3KjDt9e.js";import"./parseISO-DJIM71K9.js";import"./parse-BHaxN4X0.js";import"./getDefaultOptions-DQ6qo6CG.js";import"./util-BWsvCRGZ.js";import"./kandidat.mock-F3wnuv6n.js";import"./innsatsgrupper-BqldBv0r.js";import"./chunk-RHFAIXC4-CteuV83n.js";import"./index-CuRbE5C3.js";import"./index-DGK8N2bN.js";import"./index-KIHPoeBY.js";import"./stilling.dto-Bhwqemp5.js";import"./stillingInfoUtil-C2V4vZ-Z.js";import"./oppdaterStilling-CSF3DO5G.js";import"./Box-8eYY1qxJ.js";import"./EyeSlash-K-SdAaWp.js";import"./CircleSlash-4b6GJ6-s.js";import"./Modal-B9efuJdm.js";import"./floating-ui.react-BUPDCv_K.js";import"./Date.Input-DqDzn--5.js";import"./useFormField-BSpkEy74.js";import"./useControllableState-DPhX6gr7.js";import"./ChevronDown-BMr9GbQT.js";import"./Modal.context-CkHckn2m.js";import"./Checkbox-hcdV6L9-.js";import"./Fieldset-B5cbjLXV.js";import"./Pencil-Bpk4zDdr.js";import"./ClockDashed-BTWbNdVk.js";import"./PersonChat-CTUIEIhF.js";import"./Tasklist-lZ_4zPT0.js";import"./accordion-mrWsRhGU.js";import"./index-Ca-wU654.js";import"./index-GhNE2OVD.js";import"./index-1Buvb9FQ.js";import"./Bell-DmBojypq.js";import"./Eye-6XOmBHhJ.js";import"./ProgressBar-B-aN7JN0.js";import"./Feilmelding-DYjOJh_0.js";import"./CopyButton-DSQ0Lkk7.js";import"./Checkmark-2R3Z9HaV.js";import"./Sidelaster-D7OjQVf3.js";import"./ErrorBoundary-DREekzmR.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=j(),d=w(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(N,{hooks:[d],children:e=>{const F=e.status===I.Lukket&&i.stilling.status===_.Stoppet,f=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,K=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,B=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,S=B+R;return F?t.jsx(x,{dropDown:r,totalStillinger:f,antallFåttJobben:S}):t.jsx(b,{antallFåttJobben:S,antallDelt:K,totalStillinger:f,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const ti={tags:["autodocs"],component:n},o={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},l={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=v,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />)
}`,...o.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />)
}`,...l.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{o as Aktiv,l as AktivDropdown,p as FormidlingVariant,a as Fullført,ti as default};
