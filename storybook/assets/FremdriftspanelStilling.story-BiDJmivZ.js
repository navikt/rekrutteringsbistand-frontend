import{h as I,j as t,aL as k,S as w,h_ as j,i9 as u,ia as x}from"./iframe-sZP266bO.js";import{w as m,c as D}from"./ContextDecorators-CiHjcECp.js";import{K as b}from"./schema.zod-DYuZUlkN.js";import{u as _}from"./useKandidatlisteForEier-Xyb-iVZ9.js";import{F as y,A as N}from"./FullførtStilling-CZtohaUP.js";import{R as T}from"./GjenåpneStillingKnapp-Dr7v1niJ.js";import{K as g,I as v}from"./KandidatTyper-CkRsvxsW.js";import{T as A}from"./TilgangskontrollForInnhold-Cp_rHLJk.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-CKAF9csg.js";import"./OrganisasjonsnummerAlert-mxL8c4sm.js";import"./VStack-M5Jjoz8J.js";import"./BasePrimitive-CRPU5RNY.js";import"./List-DENPbORg.js";import"./Link-DQiMEZnz.js";import"./KandidatHendelseTag-AZu_skbn.js";import"./Tag-6IwzmMUZ.js";import"./ChatExclamationmark-DKfmyToB.js";import"./FileXMark-Da-f6SDk.js";import"./Trash-DMQ8OD7z.js";import"./HandShakeHeart-BTWM6TMD.js";import"./Calendar-Ckrf9MyK.js";import"./ThumbUp-vcLRfdLn.js";import"./Table-B8AVpSdn.js";import"./util-B9DhuNjA.js";import"./format-Dn1NmLY-.js";import"./match-CqaFT2ci.js";import"./parseISO-D6y3GPfQ.js";import"./parse-Cn_HLpVL.js";import"./getDefaultOptions-CxkFBLQq.js";import"./util-CYpKB-mD.js";import"./kandidat.mock-D4oxz4x_.js";import"./innsatsgrupper-BqldBv0r.js";import"./accordion-DxJ54EBp.js";import"./index-DwT9OAx5.js";import"./index-DZD4S9Lr.js";import"./index-BmodZ3Ua.js";import"./ChevronDown-ClqKVkNC.js";import"./Box-Cho3WrPw.js";import"./Bell-B2Mguegz.js";import"./PersonChat-AushhbbB.js";import"./Eye-CfGuE8H9.js";import"./ProgressBar-BPQLRztW.js";import"./oppdaterStilling-DXn3eTAZ.js";import"./EyeSlash-B3bXKmTh.js";import"./CircleSlash-BQzd8zLx.js";import"./Modal-CaeODgAl.js";import"./floating-ui.react-smFhzZVY.js";import"./Date.Input-CcqUSilb.js";import"./useFormField-C_CCgozA.js";import"./useControllableState-cbYrnx3z.js";import"./Modal.context-DYFw0clZ.js";import"./Checkbox-Bz8ruInN.js";import"./Fieldset-ByeiCBcK.js";import"./Pencil-nwsxps-f.js";import"./PersonbrukerTekst-BbqxGy6L.js";import"./ClockDashed-CT8dOCxc.js";import"./Tasklist-CJAu4vI3.js";import"./ErrorBoundary-BtHTUKMA.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=_(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(w,{hooks:[d],children:e=>{const F=e.status===b.Lukket&&i.stilling.status===j.Stoppet,f=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,K=e?.kandidater.filter(s=>s.utfallsendringer.some(R=>R.sendtTilArbeidsgiversKandidatliste===!0)).length??0,B=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,h=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,S=B+h;return F?t.jsx(y,{dropDown:r,totalStillinger:f,antallFåttJobben:S}):t.jsx(N,{antallFåttJobben:S,antallDelt:K,totalStillinger:f,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Pt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:v.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=x,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Pt as default};
