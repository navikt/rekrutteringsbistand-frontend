import{am as w,an as I,j as t,p as k,S as j,cc as x,cg as b,ci as g,cd as u,aK as y,cw as _}from"./iframe-D5GLcELV.js";import{w as m,c as D}from"./ContextDecorators-C7vFFwWb.js";import{F as N,A as v}from"./FullførtStilling-Dvv770qk.js";import{R as T}from"./GjenåpneStillingKnapp-C5rMoTBf.js";import{T as A}from"./TilgangskontrollForInnhold-SXU1DBJI.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-SulhFiUf.js";import"./OrganisasjonsnummerAlert-B9qpUYm5.js";import"./VStack-Bv0JWG-f.js";import"./BasePrimitive-DC9lFHA7.js";import"./List-BCZK_Xy2.js";import"./Link-CHu4RiPq.js";import"./KandidatHendelseTag-Bo8UKgDh.js";import"./Tag-DghhMzmu.js";import"./ChatExclamationmark-C51-UEDe.js";import"./FileXMark-BYjEGPc3.js";import"./Trash-BsCYRgD8.js";import"./HandShakeHeart-B7rRvMPR.js";import"./Calendar-CVA3Syd5.js";import"./ThumbUp-3OU6stig.js";import"./Table-DrxQ9pIW.js";import"./util-CtSO-HR5.js";import"./format-DeHyM4JK.js";import"./match-BGExYOs8.js";import"./parse-CIB-TC0h.js";import"./getDefaultOptions-By9Y0qpY.js";import"./parseISO-BsvmJ_As.js";import"./index-aoNK6OM-.js";import"./index-B40KJ5b4.js";import"./isBefore-D3QM3TL-.js";import"./util-HZY0gpg6.js";import"./accordion-C2KVy3ZT.js";import"./index-DtDnfd_n.js";import"./index-D5cOBAvl.js";import"./index-DejLCb63.js";import"./ChevronDown-_ie1QdRq.js";import"./Box-CxGcMxr_.js";import"./Bell-rBvGzVxS.js";import"./PersonChat-xKjoUIkm.js";import"./Eye-D0oZOG48.js";import"./ProgressBar-CMVEi4BQ.js";import"./EyeSlash-CnUlBV_x.js";import"./CircleSlash-3VcAarJ7.js";import"./Modal-DEfvENa1.js";import"./floating-ui.react-BaVvFCSb.js";import"./Date.Input-BcVGPYHY.js";import"./useFormField-69eCTCUv.js";import"./useControllableState-C6IT1995.js";import"./Modal.context-4Pv1BvK5.js";import"./Checkbox-DaZuitAg.js";import"./Fieldset-DRkYxLbx.js";import"./Pencil-DMVVnIhp.js";import"./PersonbrukerTekst-CBJa0uae.js";import"./ClockDashed-cPBXWjjl.js";import"./Tasklist-BDJL9snn.js";import"./ErrorBoundary-BhaNCS-D.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=w(),d=I(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Vt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Vt as default};
